export interface ContactNotificationEmail {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotificationEmail(_payload: ContactNotificationEmail) {
  return {
    ok: false,
    skipped: true,
    reason: 'Email delivery is not configured in this environment.',
  };
}
