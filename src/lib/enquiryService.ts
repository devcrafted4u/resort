import { LeadFormData } from '../types';

export interface StoredEnquiry extends LeadFormData {
  id: string;
  submittedAt: string;
  status: 'saved_locally' | 'synced_to_backend';
}

const STORAGE_KEY = 'sams_eden_enquiries_log';

export async function submitEnquiry(data: LeadFormData): Promise<{
  success: boolean;
  enquiryId: string;
  message: string;
  backendConfigured: boolean;
}> {
  // Simulate network delay for realistic submission state
  await new Promise((resolve) => setTimeout(resolve, 800));

  const enquiryId = 'ENQ-' + Date.now().toString(36).toUpperCase();
  const newEnquiry: StoredEnquiry = {
    ...data,
    id: enquiryId,
    submittedAt: new Date().toISOString(),
    status: 'saved_locally',
  };

  // 1. Save to local storage cache so no data is lost
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not persist enquiry to local storage', err);
  }

  // 2. Check if backend endpoint is configured via environment variable
  const webhookUrl = (import.meta as any).env?.VITE_ENQUIRY_WEBHOOK_URL;
  let backendConfigured = false;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnquiry),
      });
      if (response.ok) {
        backendConfigured = true;
      }
    } catch (e) {
      console.warn('Backend webhook delivery pending or failed, saved locally', e);
    }
  }

  return {
    success: true,
    enquiryId,
    message: backendConfigured
      ? 'Your enquiry has been successfully delivered to the resort front office!'
      : 'Enquiry received and recorded locally. Direct WhatsApp forward is ready for instant response.',
    backendConfigured,
  };
}

export function getStoredEnquiries(): StoredEnquiry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
