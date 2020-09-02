const fs = require('fs')
const path = require('path')

const isBinary = require('isbinaryfile')

/**
 * 生成
 * @param {String} dir 目录
 * @param {*} files 
 * @param {*} base 
 * @param {*} rootOptions 
 */
async function generate (dir, files, base = '', rootOptions = {}) {

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
        "less": "^3.0.4",
        "less-loader": "^5.0.0",
        "vue-template-compiler": "^2.6.11"
      }
    }
  });

  if (options.template === 'bwa/bwa-template-h5') {
    api.extendPackage(pkg => {
      return {
        dependencies:{
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
        dependencies:{
          "vue-i18n": "^8.18.2"
        },
        devDependencies: {
          
        }
      }
    })
  }

  api.render(async function (files) {

    Object.keys(files).forEach(name => { delete files[name] });

    const _template = options.repo || options.template
    const _base = 'src';

    //获取公共模版内容
    await generate(path.resolve(__dirname, './template/common'), files);

    //根据项目类型拷贝类容
    if (_template === 'bwa/bwa-template-h5') {
      await generate(path.resolve(__dirname, './template/h5'), files, "", rootOptions);
    } 
    else if (_template === 'bwa/bwa-template-news') {
      
    } 
    else {
      //todo:开发中
      // const ora = require('ora')
      // const home = require('user-home')
      // const download = require('download-git-repo')
      // const spinner = ora('模板下载中...')
      // spinner.start();

      // const tmp = path.join(home, '.bwa-app/templates', template.replace(/[/:]/g, '-'), 'src')

      // if (fs.existsSync(tmp)) {
      //   try {
      //     require('rimraf').sync(tmp)
      //   } catch (e) {
      //     console.error(e)
      //   }
      // }

      // await new Promise((resolve, reject) => {
      //   download(template, tmp, err => {
      //     spinner.stop()
      //     if (err) {
      //       return reject(err)
      //     }
      //     resolve()
      //   })
      // })

      // await generate(tmp, files, _base)
    }
  })
}
