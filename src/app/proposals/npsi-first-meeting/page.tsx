import type { Metadata } from 'next';
import NpsiFirstMeetingClient from './NpsiFirstMeetingClient';

export const metadata: Metadata = {
  title: 'MAXXLAB × North PKWY Surgical Institute — Website Transformation',
};

export default function NpsiFirstMeetingPage() {
  return <NpsiFirstMeetingClient />;
}
