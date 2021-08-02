// const components = require('../components.js');
// const getLoader = require('../dependencies');

const components = require('prismjs/components.js');
const getLoader = require('prismjs/dependencies.js');
console.log(components)

/**
 * The set of all languages which have been loaded using the below function.
 *
 * @type {Set<string>}
 */
const loadedLanguages = new Set();

/**
 * Loads the given languages and adds them to the current Prism instance.
 *
 * If no languages are provided, __all__ Prism languages will be loaded.
 *
 * @param {string|string[]} [languages]
 * @returns {void}
 */
function loadLanguages(languages) {
	if (languages === undefined) {
		languages = Object.keys(components.languages).filter(l => l != 'meta');
	} else if (!Array.isArray(languages)) {
		languages = [languages];
	}

	// the user might have loaded languages via some other way or used `prism.js` which already includes some
	// we don't need to validate the ids because `getLoader` will ignore invalid ones
	const loaded = [...loadedLanguages, ...Object.keys(Prism.languages)];

	getLoader(components, languages, loaded).load(lang => {
		if (!(lang in components.languages)) {
			if (!loadLanguages.silent) {
				console.warn('Language does not exist: ' + lang);
			}
			return;
		}

		// remove from require cache and from Prism
		// delete require.cache[require.resolve(`./prism-${lang}`)];
		delete require.cache[require.resolve(`prismjs/components/prism-${lang}`)];
		delete Prism.languages[lang];

		require(`prismjs/components/prism-${lang}`);

		loadedLanguages.add(lang);
	});
}

/**
 * Set this to `true` to prevent all warning messages `loadLanguages` logs.
 */
loadLanguages.silent = false;

module.exports = loadLanguages;
