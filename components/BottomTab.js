import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import RequestScreen from '../screens/requestScreen';
import DonateScreen from '../screens/donateScreen';

export const BottomTab = createBottomTabNavigator({
	Request: RequestScreen,
	Donate: DonateScreen,
});
