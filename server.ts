import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({limit: '100kb'}));

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface StoredInquiry extends ContactPayload {
  id: string;
  receivedAt: string;
  deliveryMode: 'resend' | 'webhook' | 'local';
}

const recentInquiries: StoredInquiry[] = [];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get('/api/health', (_req, res) => {
  res.json({status: 'ok'});
});

app.post('/api/contact', async (req, res) => {
  try {
    const body = (req.body || {}) as Partial<ContactPayload>;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2 || name.length > 120) {
      res.status(400).json({ok: false, error: 'Please enter your full name (2–120 characters).'});
      return;
    }
    if (!isValidEmail(email) || email.length > 160) {
      res.status(400).json({ok: false, error: 'Please provide a valid email address.'});
      return;
    }
    if (subject.length < 3 || subject.length > 160) {
      res.status(400).json({ok: false, error: 'Please enter a subject (3–160 characters).'});
      return;
    }
    if (message.length < 10 || message.length > 4000) {
      res.status(400).json({ok: false, error: 'Please write a message of at least 10 characters.'});
      return;
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const contactTo = process.env.CONTACT_TO_EMAIL?.trim() || 'rishirajput261@gmail.com';
    const contactFrom = process.env.CONTACT_FROM_EMAIL?.trim() || 'Portfolio <onboarding@resend.dev>';
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

    let deliveryMode: 'resend' | 'webhook' | 'local' = 'local';

    if (resendApiKey) {
      const resendResp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: contactFrom,
          to: [contactTo],
          reply_to: email,
          subject: `[Portfolio Inquiry] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        }),
      });
      if (!resendResp.ok) {
        const errText = await resendResp.text();
        console.error('Resend API delivery error:', errText);
        res.status(502).json({
          ok: false,
          error: 'Email delivery service returned an error. Please try emailing directly.',
        });
        return;
      }
      deliveryMode = 'resend';
    } else if (webhookUrl) {
      const hookResp = await fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, subject, message, receivedAt: new Date().toISOString()}),
      });
      if (!hookResp.ok) {
        console.error('Webhook delivery error:', hookResp.status);
        res.status(502).json({
          ok: false,
          error: 'Message relay service failed. Please try emailing directly.',
        });
        return;
      }
      deliveryMode = 'webhook';
    }

    const record: StoredInquiry = {
      id: `inq_${Date.now()}`,
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
      deliveryMode,
    };

    recentInquiries.unshift(record);
    if (recentInquiries.length > 50) {
      recentInquiries.pop();
    }

    res.status(200).json({
      ok: true,
      id: record.id,
      deliveryMode,
      message:
        deliveryMode === 'local'
          ? 'Message received and logged. Configure RESEND_API_KEY or CONTACT_WEBHOOK_URL in your server environment to enable automated email forwarding.'
          : 'Your message has been delivered successfully. Thank you for reaching out!',
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    res.status(500).json({
      ok: false,
      error: 'An unexpected server error occurred. Please try again later.',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
