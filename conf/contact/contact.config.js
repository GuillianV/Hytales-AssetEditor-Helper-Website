// initScriptPlugin.ts
import { initialize } from './contact.js';

export default () => {
	return {
		name: 'contact-init-script',
		async buildStart() {
			await initialize();
		}
	};
};
