//This file is used to test the settings tabs

import { mount } from "@vue/test-utils"
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'

describe('Testing User Sign ins', () => {
    
    it('User starts out not signed in', () => {
        const localThis = {};
        expect(NumberRenderer.computed.signedIn.call(localThis)).not.toBeTruthy();
    })
})