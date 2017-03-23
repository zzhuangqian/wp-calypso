/**
 * External dependencies
 */
import React from 'react';
import { translate } from 'i18n-calypso';
import {
    overEvery as and,
} from 'lodash';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import {
    makeTour,
    Tour,
    Step,
    ButtonRow,
    Next,
    Quit,
} from 'layout/guided-tours/config-elements';
import {
    isNewUser,
} from 'state/ui/guided-tours/contexts';
import { isDesktop } from 'lib/viewport';

export const MediaBasicsTour = makeTour(
    <Tour
        name="mediaBasicsTour"
        version="20170321"
        path="/media"
            when={ and(
            isDesktop,
            isNewUser,
            ) }
        >
        <Step
            name="init"
            arrow="top-left"
            target=".media-library__upload-buttons"
            placement="below"
            >
            <p>
                Welcome to the Media Libary! Click here to add media to your site.
            </p>
            <ButtonRow>
                <Next step="drag-and-drop">Continue</Next>
                <Quit>Quit</Quit>
            </ButtonRow>
        </Step>
    
        <Step
            name="drag-and-drop"
            arrow="top-left"
            target=".media-library__list .media-library__list-item:first-of-type"
            placement="below"
            >
            <p>
                You can also drag-and-drop new media directly into your library.
            </p>
            <img src="https://cldup.com/AnA1V5AnoE.gif"
            style={ { marginBottom: '10px', border: '3px solid #00AADC', borderRadius: '4px' } }
            />
            <ButtonRow>
                <Next step="select-image">Continue</Next>
                <Quit>Quit</Quit>
            </ButtonRow>
        </Step>
        
    </Tour>
);
