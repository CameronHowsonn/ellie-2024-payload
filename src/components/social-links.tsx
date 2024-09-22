import styled from 'styled-components'
import { footerSocialLinks } from './footer'
import Link from 'next/link'
import Text from '@/components/text'

interface SocialLinksProps {
  showTitle?: boolean
}

const SocialLinks: React.FC<SocialLinksProps> = ({ showTitle = true }) => {
  return (
    <HeaderSocialContainer className="socials">
      {showTitle && (
        <Text
          className={`social-links-text ${showTitle ? 'has' : 'hasnt'}`}
          variant="medium"
          color="var(--white)"
          style={{
            textTransform: 'uppercase',
          }}
        >
          Follow me on
        </Text>
      )}
      {footerSocialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.linkName}
        >
          <link.icon />
        </Link>
      ))}
    </HeaderSocialContainer>
  )
}

export default SocialLinks

const HeaderSocialContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  .social-links-text {
    &.has {
      @media (min-width: 47.9375rem) and (max-width: 55.25rem) {
        display: none;
      }
    }

    .headroom--pinned & {
      color: var(--white);
    }

    .headroom--scrolled & {
      color: var(--slate);
    }
  }
`
