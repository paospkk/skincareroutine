import React from 'react';
import { ExternalLink, XCircle, Info, Check } from 'lucide-react';

const SocialLinksPopup = ({ onClose }) => {
  return (
    <div className='popup-overlay'>
      <div className='popup-content'>
        <h2>Welcome to ร่างทองหมื่นปี Quiz</h2>

        <div className='info-section'>
          <h3>
            <Info size={20} className='icon-inline' /> How it works:
          </h3>
          <ol>
            <li>
              You'll be presented with a series of questions about your
              lifestyle and preferences.
            </li>
            <li>
              Answer each question honestly - there are no right or wrong
              answers!
            </li>
            <li>
              Based on your responses, we'll generate personalized product
              recommendations.
            </li>
            <li>
              At the end, you'll receive expert advice and a summary of your
              results.
            </li>
          </ol>
        </div>

        <div className='info-section'>
          <h3>
            <Info size={20} className='icon-inline' /> Important Information:
          </h3>
          <ul>
            <li>
              Your responses are confidential and will be used to provide you
              with the best possible recommendations.
            </li>
            <li>
              We collect and process your quiz responses to provide personalized
              product recommendations.
            </li>
            <li>
              By taking this quiz, you consent to the collection and use of your
              responses as described in our{' '}
              <a
                href='/privacy-policy'
                target='_blank'
                rel='noopener noreferrer'
              >
                Privacy Policy
              </a>
              .
            </li>
            <li>
              We may use this information for improving our products and
              services, conducting market research, and sending personalized
              marketing communications.
            </li>
          </ul>
        </div>

        <div className='disclaimer'>
          <p>
            <strong>Disclaimer:</strong> ร่างทองหมื่นปี is not a medical
            professional, healthcare provider, or cosmetic chemist. The
            @RangThong10000 page shares information based on personal
            experiences and research from various sources. We hope that
            followers can adapt this information as appropriate for their
            individual needs.
          </p>
          <p>
            If you have any skin problems, we strongly recommend consulting a
            doctor and/or specialist directly.
          </p>
        </div>

        <button onClick={onClose} className='close-button'>
          <Check size={20} className='icon-inline' /> เข้าใจ
        </button>

        <div className='social-links-section'>
          <h4>Follow ร่างทองหมื่นปี RangThong10000</h4>
          <div className='social-links'>
            <a
              href='https://x.com/RangThong10000'
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLink className='icon-inline' /> Twitter
            </a>
            <a
              href='https://www.facebook.com/RangThong10000'
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLink className='icon-inline' /> Facebook
            </a>
            <a
              href='https://www.instagram.com/RangThong10000'
              target='_blank'
              rel='noopener noreferrer'
            >
              <ExternalLink className='icon-inline' /> Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksPopup;
