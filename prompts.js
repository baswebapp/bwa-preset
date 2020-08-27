module.exports = [{
    type: 'list',
    name: 'template',
    message: '请选择 bwa 模板',
    choices: [{
        name: 'h5模版',
        value: 'bwa/bwa-template-h5'
      },
      {
        name: '官网模板',
        value: 'bwa/bwa-template-news'
      },
      {
        name: '自定义模板',
        value: 'custom'
      }
    ],
    default: 'None'
  },
  {
    when: answers => answers.template === 'custom',
    type: 'input',
    name: 'repo',
    message: '请输入自定义 bwa 模板地址',
    filter(input) {
      return new Promise(function (resolve, reject) {
        if (input) {
          resolve(input)
        } else {
          reject(new Error('bwa 模板地址不能为空'))
        }
      })
    }
  }
]