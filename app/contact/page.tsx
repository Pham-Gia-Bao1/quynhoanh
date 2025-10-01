import { generateBaseMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import React from 'react'
import ContactPage from './ContactPage';
export const metadata: Metadata = generateBaseMetadata(
  "Liên hệ - Khách sạn Quỳnh Oanh",
  "Trải nghiệm sự sang trọng và thoải mái tại Khách sạn Quỳnh Oanh. Dịch vụ đẳng cấp, tiện nghi hiện đại, tọa lạc tại trung tâm Việt Nam."
);

export default function page() {
  return (
    <><ContactPage/></>
  )
}
