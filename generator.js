const fs = require('fs')
const path = require('path')
const isBinary = require('isbinaryfile')
const ora = require('ora')
const home = require('user-home')
const download = require('./download')

/**
 * 生成
 * @param {String} dir 目录
 * @param {*} files 
 * @param {*} base 
 * @param {*} rootOptions 
 */
async function generate(dir, files, base = '', rootOptions = {}) {

	const glob = require('glob')

	glob.sync('**/*', {
		cwd: dir,
		nodir: true
	}).forEach(rawPath => {
		const sourcePath = path.resolve(dir, rawPath)
		const filename = path.join(base, rawPath)

		if (isBinary.sync(sourcePath)) {
			files[filename] = fs.readFileSync(sourcePath) // return buffer
		} else {
			let content = fs.readFileSync(sourcePath, 'utf-8')
			if (path.basename(filename) === 'manifest.json') {
				content = content.replace('{{name}}', rootOptions.projectName || '')
			}
			if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
				files[`.${filename.slice(1)}`] = content
			} else if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
				files[`${filename.slice(1)}`] = content
			} else {
				files[filename] = content
			}
		}
	})
}

module.exports = (api, options, rootOptions) => {
	
	//扩展package配置
	api.extendPackage(pkg => {
		return {
			dependencies: {
				"axios": "^0.19.2",
				"core-js": "^3.6.5",
				"vue": "^2.6.11",
				"vue-router": "^3.2.0",
				"vuex": "^3.4.0"
			},
			devDependencies: {
				"@vue/cli-plugin-babel": "^4.5.0",
				"@vue/cli-service": "^4.5.0",
				"babel-plugin-import": "^1.13.0",
				"less": "^3.0.4",
				"less-loader": "^5.0.0",
				"vue-template-compiler": "^2.6.11"
			}
		}
	});

	if (options.template === 'bwa/bwa-template-h5') {
		api.extendPackage(pkg => {
			return {
				dependencies: {
					"vant": "^2.10.3"
				},
				devDependencies: {

				}
			}
		})
	} 
	else if (options.template === 'bwa/bwa-template-news') {
		api.extendPackage(pkg => {
			return {
				dependencies: {
					"vue-i18n": "^8.18.2"
				},
				devDependencies: {

				}
			}
		})
	}

	api.render(async function (files) {

		Object.keys(files).forEach(name => { delete files[name] });

		let _template = options.repo || options.template
		let _base = 'src';

		//获取公共模版内容
		await generate(path.resolve(__dirname, './template/common'), files);
	
        let _spinner = ora('模板下载中...')
        
        //下载到根目录
		let _tmpDir = path.join(home, '.bwa-app/templates', _template.replace(/[/:]/g, '-'))

		_spinner.start();

		await new Promise((resolve, reject) => {
			//http://gitlab.baswebapp.cn/bwa/bwa-template-h5.git
			//开始下载 /bwa/bwa-template-h5/repository/archive.zip?ref=master
			download(_template, _tmpDir, err => {

				//下载完成
				_spinner.stop()

				if (err) { return reject(err) }

				resolve()
			})
		})

		await generate(_tmpDir, files, _base)
	})
}