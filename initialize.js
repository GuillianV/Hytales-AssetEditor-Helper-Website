import authKit from './conf/auth/auth.config.js';
import parametresKit from './conf/parametres/parametres.config.js';
import assetsKit from './conf/assets/asset.config.js';
import googleapisKit from './conf/googleapis/googleapis.config.js';
import contactKit from './conf/contact/contact.config.js';
const kits = [authKit(), parametresKit(), assetsKit(), googleapisKit(), contactKit()];

for (const kit of kits) {
	kit.buildStart();
}
