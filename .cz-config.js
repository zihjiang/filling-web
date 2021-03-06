'use strict';

module.exports = {

  types: [
    {
      value: ':construction: WIP',
      name: 'πͺ  WIP:      Work in progress'
    },
    {
      value: ':sparkles: feat',
      name: 'β¨  feat:     A new feature'
    },
    {
      value: ':bug: fix',
      name: 'π  fix:      A bug fix'
    },
    {
      value: ':hammer: refactor',
      name: 'π¨  refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: ':pencil: docs',
      name: 'π  docs:     Documentation only changes'
    },
    {
      value: ':white_check_mark: test',
      name: 'β  test:     Add missing tests or correcting existing tests'
    },
    {
      value: ':thought_balloon: chore',
      name: 'π―  chore:    Changes that don\'t modify src or test files. Such as updating build tasks, package manager'
    },
    {
      value: ':lipstick: ui',
      name: 'π Updating the UI and style files.',
    },
    {
      value: ':art: style',
      name:
        'π¨ Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'revert',
      name: 'βͺ  revert:   Revert to a commit'
    },
    {
      value: ':package: dep_up',
      name: 'π¦ Updating compiled files or packages.',
    },
    {
      value: ':green_heart: fixci',
      name: 'π Fixing CI Build.',
    },
    {
      value: ':truck: mv',
      name: 'π Moving or renaming files.',
    },
    {
      value: ':fire: prune',
      name: 'π₯ Removing code or files.',
    },
    {
      value: ':bookmark: release',
      name: 'π Releasing / Version tags.',
    },
    {
      value: ':rocket: first release',
      name: 'π first releast!',
    }
  ],

  // scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  messages: {
    type: 'ιζ©δΈη§δ½ ηζδΊ€η±»ε:',
    scope: 'ιζ©δΏ?ζΉζΆεθε΄ (ε―ι):',
    // used if allowCustomScopes is true
    customScope: 'θ―·θΎε₯ζ¬ζ¬‘ζΉε¨ηθε΄οΌε¦οΌεθ½γζ¨‘εη­οΌ:',
    subject: 'η?η­θ―΄ζ:\n',
    body: 'θ―¦η»θ―΄ζοΌδ½Ώη¨"|"ειεΌε―δ»₯ζ’θ‘(ε―ι)οΌ\n',
    breaking: 'ιεΌε?Ήζ§οΌη ΄εζ§εεθ―΄ζ (ε―ι):\n',
    footer: 'ε³θε³ι­ηissueοΌδΎε¦οΌ#31, #34(ε―ι):\n',
    confirmCommit: 'η‘?ε?ζδΊ€θ―΄ζ?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],  // δ»ε¨featγfixζΆε‘«εη ΄εζ§ζ΄ζΉ
  subjectLimit: 100, // limit subject length
  breaklineChar: '|',  // θ?Ύη½?bodyεfooterδΈ­ηζ’θ‘η¬¦
};

