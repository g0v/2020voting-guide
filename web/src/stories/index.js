import React from 'react';

import {storiesOf} from '@storybook/react';
import InfoCard from '../components/InfoCard';
import CardExample from '../components/CardExample';

storiesOf('Card', module)
    .add('Testing', () => <CardExample />)
    .add('Legislatior Info', () => <InfoCard />);
