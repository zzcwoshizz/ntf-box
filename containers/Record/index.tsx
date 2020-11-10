import { Typography } from 'antd';
import React from 'react';

import Header from '@/components/Header';
import useContainer from '@/shared/hooks/useContainer';

import Chart from './components/Chart';
import Data from './components/Data';

const { Title, Text } = Typography;

const Record: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();

  return (
    <>
      <Header />
      <div className="container">
        <Title level={2} style={{ textIndent: 24 }}>
          Record
        </Title>
        <div className="content">
          <Data />
          <div className="chart">
            <Chart />
          </div>
          <div className="intro">
            <Title level={3}>NTF introduction</Title>
            <Text type="secondary">
              Shure’s Music Phone Adapter (MPA) is our favorite iPhone solution, since it lets you
              use the headphones you’re most comfortable with. It has an iPhone-compatible jack at
              one end and a microphone module with an Answer/End/Pause button and a female 3.5mm
              audio jack for connecting to your own headphones. We connected the adapter to the
              Shure SE110 in-ear headphones, whose cabling is modular; the top half is fairly short,
              so when used with the adapter, the cable is the right length, but the mic lays around
              your navel. The MPA comes with three different sizes of foam and silicone tips and a
              carrying pouch. Shure’s coated memory-foam tips are the most comfortable on the
              market, and they stay in your ear securely–especially if you wear the cables over the
              tops of your ears.
            </Text>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 32px auto;
        }

        .content {
        }
        .chart {
          margin: 16px auto;
          padding: 24px 0;
          background-color: #fff;
        }
        .intro {
          padding: 20px 24px;
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default Record;
