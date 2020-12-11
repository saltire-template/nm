// !!! Sharing the dependencies of caz
module.paths = require.main.paths

const path = require('path')
const chalk = require('chalk')
const { name, version } = require('./package.json')

const date = new Date()

module.exports = {
  name,
  version,
  metadata: {
    year: date.getFullYear(),
    month: ('0' + (date.getMonth() + 1)).substr(-2),
    day: ('0' + date.getDate()).substr(-2)
  },
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: '项目名称'
    },
    {
      name: 'version',
      type: 'text',
      message: '版本号'
    },
    {
      name: 'description',
      type: 'text',
      message: '项目描述',
      initial: ' '
    },
    {
      name: 'author',
      type: 'text',
      message: '项目作者'
    },
    {
      name: 'email',
      type: 'text',
      message: '作者邮箱'
    },
    {
      name: 'url',
      type: 'text',
      message: '作者主页',
      initial: 'https://juejin.cn/user/668105060404104'
    },
    {
      name: 'license',
      type: 'select',
      message: '开源许可',
      hint: ' ',
      choices: [
        { value: 'MIT' },
      ]
    },
    {
      name: 'github',
      type: 'text',
      message: 'Github账号',
      initial: 'saltire'
    },
    {
      name: 'features',
      type: 'multiselect',
      message: '选择你的 npm 包初始化结构',
      instructions: false,
      choices: [
        { title: '是否是 CLI 程序', value: 'cli' },
        { title: '是否添加说明文档', value: 'docs' },
        { title: '是否添加默认用例', value: 'example' },
      ]
    },
    {
      name: 'install',
      type: 'confirm',
      message: '是否立即安装依赖',
      initial: true
    },
    {
      name: 'pm',
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: '选择你的包管理器',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ],
  filters: {
    /** @param {{ features: string[] }} answers */
    'bin/**': answers => answers.features.includes('cli'),
    /** @param {{ features: string[] }} answers */
    'docs/**': answers => answers.features.includes('docs'),
    /** @param {{ features: string[] }} answers */
    'example/**': answers => answers.features.includes('example'),
  },
  install: 'npm',
  init: true,
  setup: async ctx => {
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  },
  complete: async ctx => {
    console.clear()
    console.log(chalk.green(`\n ## 使用模板[${ctx.template}]成功创建了项目： ${ctx.project}\.\n`))
    if (ctx.dest !== process.cwd()) {
      console.log(chalk`  $ {cyan cd ${path.relative(process.cwd(), ctx.dest)}}`)
    }
    if (ctx.config.install === false) {
      console.log(chalk`  $ {cyan npm install} {gray # or yarn}`)
    }
    console.log(chalk`  $ {cyan ${ctx.config.install ? ctx.config.install : 'npm'} run dev}`)
    console.log(chalk.green(`\n ## 现在你可以使用它了,尝试进入该项目开始你的 npm 之旅吧~~`))
  }
}
