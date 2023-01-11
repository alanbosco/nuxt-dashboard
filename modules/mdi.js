import { resolve } from 'path'

const icons = ['Phone', 'Alarm', 'Account', 'CurrencyUsd', 'EmoticonOutline', 'Refresh']

export default function () {
	this.nuxt.hook('components:dirs', (dirs) => {
		dirs.push({
			path: resolve('node_modules/vue-material-design-icons'),
			prefix: 'MaterialIcon',
			pattern: `**/@(${icons.join('|')}).vue`,
		})
	})
}