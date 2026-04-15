import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = '813 Dim Sum Café'

interface NewApplicationProps {
  jobTitle?: string
  applicantName?: string
  applicantEmail?: string
  applicantPhone?: string
  coverMessage?: string
  hasResume?: boolean
}

const NewApplicationNotificationEmail = ({
  jobTitle = 'Unknown Position',
  applicantName = 'Unknown',
  applicantEmail = '',
  applicantPhone = '',
  coverMessage = '',
  hasResume = false,
}: NewApplicationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New application for {jobTitle} from {applicantName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Job Application</Heading>
        <Text style={label}>Position</Text>
        <Text style={value}>{jobTitle}</Text>

        <Hr style={divider} />

        <Text style={label}>Applicant Name</Text>
        <Text style={value}>{applicantName}</Text>

        <Text style={label}>Email</Text>
        <Text style={value}>{applicantEmail}</Text>

        {applicantPhone && (
          <>
            <Text style={label}>Phone</Text>
            <Text style={value}>{applicantPhone}</Text>
          </>
        )}

        <Hr style={divider} />

        <Text style={label}>Cover Message</Text>
        <Text style={messageText}>{coverMessage || 'No message provided'}</Text>

        <Hr style={divider} />

        <Text style={label}>Resume Attached</Text>
        <Text style={value}>{hasResume ? 'Yes (PDF uploaded)' : 'No'}</Text>

        <Section style={footer}>
          <Text style={footerText}>
            This notification was sent from {SITE_NAME} Careers. 
            View all applications at your admin dashboard.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewApplicationNotificationEmail,
  subject: (data: Record<string, any>) => `New application: ${data.jobTitle || 'Unknown Position'} — ${data.applicantName || 'Unknown'}`,
  to: 'hey@813cafe.com',
  displayName: 'New job application notification',
  previewData: {
    jobTitle: 'All-Around Staff',
    applicantName: 'Juan Dela Cruz',
    applicantEmail: 'juan@example.com',
    applicantPhone: '09171234567',
    coverMessage: 'I am hardworking and willing to learn. I have experience in food service and I want to grow with your team.',
    hasResume: true,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Georgia', 'Times New Roman', serif" }
const container = { padding: '24px 32px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: 'hsl(168, 30%, 15%)', margin: '0 0 24px' }
const label = { fontSize: '11px', fontWeight: 'bold' as const, color: 'hsl(160, 10%, 45%)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 4px' }
const value = { fontSize: '15px', color: 'hsl(160, 30%, 12%)', margin: '0 0 16px', lineHeight: '1.5' }
const messageText = { fontSize: '14px', color: 'hsl(160, 30%, 12%)', margin: '0 0 16px', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const }
const divider = { borderColor: 'hsl(40, 10%, 88%)', margin: '16px 0' }
const footer = { marginTop: '32px' }
const footerText = { fontSize: '12px', color: 'hsl(160, 10%, 45%)', margin: '0' }
