<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_HCAPTCHA_SITEKEY } from '$env/static/public';

	// Global declarations
	/* declare global {
    interface Window {
      sitekey: string;
      hcaptchaOnLoad: Function;
      onSuccess: Function;
      onError: Function;
      onClose: Function;
      onExpired: Function;
      hcaptcha: any;
    }
  }*/

	interface Props {
		sitekey?: string;
		apihost?: string;
		hl?: string;
		reCaptchaCompat?: boolean;
		theme?: 'dark' | 'light';
		size?: 'normal' | 'compact' | 'invisible';
		onSuccess?: (token: string) => void;
		onError?: () => void;
		onClose?: () => void;
		onExpired?: () => void;
		onLoad?: () => void;
		resetTrigger?: boolean;
	}

	let {
		sitekey = PUBLIC_HCAPTCHA_SITEKEY,
		apihost = 'https://js.hcaptcha.com/1/api.js',
		hl = '',
		reCaptchaCompat = false,
		theme = 'light',
		size = 'normal',
		onSuccess = () => {},
		onError = () => {},
		onClose = () => {},
		onExpired = () => {},
		onLoad = () => {},
		resetTrigger = $bindable(false)
	}: Props = $props();

	// Unique ID for this captcha instance
	const id = Math.floor(Math.random() * 100000);

	let mounted = $state(false);
	let loaded = $state(false);
	let widgetID: string | null = $state(null);
	let scriptElement: HTMLScriptElement | null = $state(null);

	// Construct the script URL
	const query = new URLSearchParams({
		recaptchacompat: reCaptchaCompat ? 'on' : 'off',
		onload: 'hcaptchaOnLoad',
		render: 'explicit'
	});
	const scriptSrc = `${apihost}?${query.toString()}`;

	// Reset function
	export function reset() {
		if (mounted && loaded && widgetID && window.hcaptcha) {
			window.hcaptcha.reset(widgetID);
		}
	}

	// Execute function
	export function execute(options?: any) {
		if (mounted && loaded && widgetID && window.hcaptcha) {
			return window.hcaptcha.execute(widgetID, options);
		}
	}

	onMount(() => {
		if (browser && !sitekey) {
			sitekey = window.sitekey;
		}

		if (browser) {
			// Set up global callbacks
			window.hcaptchaOnLoad = () => {
				loaded = true;
				onLoad();
			};

			window.onSuccess = (token: string) => {
				onSuccess(token);
			};

			window.onError = () => {
				onError();
			};

			window.onClose = () => {
				onClose();
			};

			window.onExpired = () => {
				onExpired();
			};

			// Load the script if hcaptcha is not already available
			if (!window.hcaptcha) {
				scriptElement = document.createElement('script');
				scriptElement.src = scriptSrc;
				scriptElement.async = true;
				scriptElement.defer = true;
				document.head.appendChild(scriptElement);
			} else {
				// hcaptcha is already loaded
				loaded = true;
			}
		}

		mounted = true;
	});

	onDestroy(() => {
		if (browser) {
			// Clean up global callbacks
			if (window.hcaptchaOnLoad) window.hcaptchaOnLoad = null;
			if (window.onSuccess) window.onSuccess = null;
			if (window.onError) window.onError = null;
			if (window.onClose) window.onClose = null;
			if (window.onExpired) window.onExpired = null;

			// Remove widget if it exists
			if (loaded && widgetID && window.hcaptcha) {
				try {
					window.hcaptcha.remove(widgetID);
				} catch (e) {
					// Ignore errors during cleanup
				}
			}
		}

		// Clean up script element if we created it
		if (scriptElement && scriptElement.parentNode) {
			scriptElement.parentNode.removeChild(scriptElement);
		}
	});

	// Watch for reset trigger
	$effect(() => {
		if (resetTrigger && mounted && loaded && widgetID && window.hcaptcha) {
			window.hcaptcha.reset(widgetID);
			resetTrigger = false;
		}
	});

	// Render the widget when conditions are met
	$effect(() => {
		if (mounted && loaded && browser && window.hcaptcha && !widgetID) {
			try {
				widgetID = window.hcaptcha.render(`h-captcha-${id}`, {
					sitekey,
					hl,
					theme,
					callback: 'onSuccess',
					'error-callback': 'onError',
					'close-callback': 'onClose',
					'expired-callback': 'onExpired',
					size
				});
			} catch (error) {
				console.error('Failed to render hCaptcha:', error);
			}
		}
	});
</script>

<svelte:head>
	{#if mounted && !window?.hcaptcha}
		<script src={scriptSrc} async defer></script>
	{/if}
</svelte:head>

<div id="h-captcha-{id}" class="hcaptcha-widget">
	{#if !loaded}
		<div class="hcaptcha-loading">Loading captcha...</div>
	{/if}
</div>

<style>
	.hcaptcha-widget {
		display: inline-block;
	}

	.hcaptcha-loading {
		width: 300px;
		height: 78px;
		background: #f9f9f9;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666;
		font-size: 14px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
</style>
