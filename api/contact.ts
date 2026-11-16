interface VercelRequestLike {
  method?: string;
  body?: unknown;
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseBody(raw: unknown): Partial<ContactPayload> {
  if (!raw) return {};
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Partial<ContactPayload>;
    } catch {
      return {};
    }
  }
  if (typeof raw === 'object') {
    return raw as Partial<ContactPayload>;
  }
  return {};
}

export default async function handler(
  req: VercelRequestLike,
  res: VercelResponseLike,
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ok: false, error: 'Method not allowed. Use POST.'});
    return;
  }

  try {
    const body = parseBody(req.body);
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
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          receivedAt: new Date().toISOString(),
        }),
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

    res.status(200).json({
      ok: true,
      id: `inq_${Date.now()}`,
      deliveryMode,
      message:
        deliveryMode === 'local'
          ? 'Message received. Add RESEND_API_KEY or CONTACT_WEBHOOK_URL in Vercel Environment Variables to forward submissions to your email.'
          : 'Your message has been delivered successfully. Thank you for reaching out!',
    });
  } catch (error) {
    console.error('Vercel contact endpoint error:', error);
    res.status(500).json({
      ok: false,
      error: 'An unexpected server error occurred. Please try again later.',
    });
  }
}
