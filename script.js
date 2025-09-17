// ==UserScript==
// @name         WPlace IP Manager
// @description  Automatic bypass of restrictions on multi-account
// @icon         https://wplace.live/img/favicon-96x96.png
// @author       kash.88
// @version      1.1.1
// @license      MPL-2.0
// @supportURL   https://t.me/kash_tea
// @updateURL    https://raw.githubusercontent.com/kash-88/wplace-lP-remove/main/script.js
// @downloadURL  https://raw.githubusercontent.com/kash-88/wplace-lP-removee/main/script.js
// @match        *://*.wplace.live/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Search menu with all icons
    function findNavigationPanel() {
        const selectors = [
            '[class*="flex flex-col items-center gap-3"]'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element;
            }
        }

        const fallbackElement = document.querySelector('nav') || document.querySelector('.navbar') || document.querySelector('header');

        return fallbackElement;
    }

    // Create button in menu
    function createAccountManagerButton() {
        const navPanel = findNavigationPanel();

        if (!navPanel) {
            return;
        }

        const button = document.createElement('button');
        button.id = 'IP-Manager';
        button.className = 'btn btn-md shadow-md btn-circle';
        button.innerHTML = `
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
        `;
        button.title = 'Remove IP in localStorage';

        button.addEventListener('click', (e) => {
            lPdelete()
        });

        const userSection = navPanel.querySelector('[class*="flex flex-col items-center gap-3"]');

        if (userSection) {
            userSection.appendChild(button);
        } else {
            navPanel.appendChild(button);
        }
    }

    function lPdelete() {
        try {
            localStorage.removeItem('lp');
            console.log('lP successfully removed from localStorage!');
        } catch (error) {
            console.error('lP not removed from localStorage! Error:', error);
        }
    }

    async function init() {
        // Await load DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Create interface elements with a slight delay for the page to fully load + Delete lP
        setTimeout(() => {
                createAccountManagerButton();
                lPdelete();
        }, 2000);
    }

    init();
})();
