import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import shopLogo from '../Images/shop_logo.png'

import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinksTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialMediaLogo,
  WebsiteRights,
  SocialIcon,
  SocialIconLink,
} from './FooterElements'
function Footer() {
  return (
    <FooterContainer>
      {/* <iframe src='https://www.google.com/maps/embed?pb=!…” width=”600″ height=”450″ frameborder=”0″ style=”border:0' allowfullscreen></iframe> */}
      <FooterWrap>
        {/* <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinksTitle>Food items</FooterLinksTitle>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/">Our Products</FooterLink>
            </FooterLinkItems> 
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinksTitle>Social Media</FooterLinksTitle>
              <FooterLink to="/">Facebook</FooterLink>
              <FooterLink to="/">Instagram</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer> */}
        <SocialMedia>
          <SocialMediaWrap>
            <SocialMediaLogo to="/">
              {' '}
              <img src={shopLogo} width="200px" height={'200px'} /> Ruwan
              Bakehouse
            </SocialMediaLogo>
            <WebsiteRights>
              © {new Date().getFullYear()} All Right Reserved.
            </WebsiteRights>
            <SocialIcon>
              <SocialIconLink
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </SocialIconLink>
              <SocialIconLink
                href="https://web.whatsapp.com/"
                target="_blank"
                aria-label="Whatsapp"
              >
                <WhatsAppIcon />
              </SocialIconLink>
            </SocialIcon>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  )
}

export default Footer
