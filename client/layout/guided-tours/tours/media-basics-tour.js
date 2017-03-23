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
    Continue
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
            placement="right"
            >
            <p>
                You can also drag-and-drop new media directly into your library.
            </p>
            <img src="https://cldup.com/AnA1V5AnoE.gif"
            style={ { marginBottom: '10px', border: '3px solid #00AADC', borderRadius: '4px' } }
            />
            <Continue click step="choose-image" target=".media-library__list-item-figure">
                Next choose an image from the media library to continue.
            </Continue>
        </Step>
        
        <Step name="choose-image"
            placement="below"
            arrow="top-left"
            //when={ and( isImageSelected ) }
            target=".editor-media-modal__secondary-action"
            >
            <Continue click step="launch-modal" target=".editor-media-modal__secondary-action">
                Now that an item is selected you can click the Edit button to continue.
            </Continue>
        </Step>
        
    </Tour>
);
