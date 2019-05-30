import React from 'react';

import {storiesOf} from '@storybook/react';
import InfoCard from '../components/InfoCard';
import CardExample from '../components/CardExample';
import InfoDetalis from '../components/InfoDetails';

storiesOf('Legislator', module)
    .add('Testing', () => <CardExample />)
    .add('Overview', () => <InfoCard />)
    .add('Details', () => <InfoDetalis />);
