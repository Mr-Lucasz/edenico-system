'use client'

import { FiAward } from 'react-icons/fi'
import { RankBadges } from './RankBadges'

export function Ranking() {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid rgb(190, 219, 255)',
        backgroundColor: 'rgb(240, 249, 255)',
        padding: '24px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
      }}
    >
      {/* Left Section - Title and Icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
        {/* Trophy Icon Circle */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgb(255, 237, 74)',
            border: '2px solid rgb(255, 255, 255)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            flexShrink: 0,
          }}
        >
          <FiAward style={{ width: '32px', height: '32px', color: 'rgb(255, 255, 255)' }} />
        </div>

        {/* Title Section */}
        <div>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'rgb(31, 41, 55)',
              margin: 0,
              marginBottom: '4px',
            }}
          >
            Liga Jovem
          </h2>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgb(107, 114, 128)',
              margin: 0,
            }}
          >
            Ranking Nacional
          </p>
        </div>
      </div>

      {/* Right Section - Ranking Tier Cards */}
      <RankBadges />
    </div>
  )
}
