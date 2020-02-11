const nekos = new (require('nekos.life'))()
const Strings = require('../i18n/enUS/NekoLife')

const ValidCmds = {
  sfw: {
    smug: 'smug',
    baka: 'baka',
    tickle: 'tickle',
    slap: 'slap',
    poke: 'poke',
    pat: 'pat',
    neko: 'neko',
    nekogif: 'nekoGif',
    meow: 'meow',
    lizard: 'lizard',
    kiss: 'kiss',
    hug: 'hug',
    foxgirl: 'foxGirl',
    feed: 'feed',
    cuddle: 'cuddle',
    why: 'why',
    cattext: 'catText',
    kemonomimi: 'kemonomimi',
    holo: 'holo',
    woof: 'woof'
  },
  nsfw: {
    randomhentaigif: 'randomHentaiGif',
    pussy: 'pussy',
    nekogif: 'nekoGif',
    neko: 'neko',
    lesbian: 'lesbian',
    kuni: 'kuni',
    cumsluts: 'cumsluts',
    classic: 'classic',
    boobs: 'boobs',
    bj: 'bj',
    anal: 'anal',
    yuri: 'yuri',
    trap: 'trap',
    tits: 'tits',
    girlsologif: 'girlSoloGif',
    girlsolo: 'girlSolo',
    smallboobs: 'smallBoobs',
    pussywankgif: 'pussyWankGif',
    pussyart: 'pussyArt',
    kemonomimi: 'kemonomimi',
    kitsune: 'kitsune',
    keta: 'keta',
    holo: 'holo',
    holoero: 'holoEro',
    hentai: 'hentai',
    futanari: 'futanari',
    femdom: 'femdom',
    feetgif: 'feetGif',
    erofeet: 'eroFeet',
    feet: 'feet',
    ero: 'ero',
    erokitsune: 'eroKitsune',
    erokemonomimi: 'eroKemonomimi',
    eroneko: 'eroNeko',
    eroyuri: 'eroYuri',
    cumarts: 'cumArts',
    blowjob: 'blowJob',
    pussygif: 'pussyGif'
  }
}

const validateFuncName = (val, msg, arg) => {
  // Split args into an array to make life easier
  const argsArr = msg.argString.trim().toLowerCase().split(' ')

  if (ValidCmds.sfw[argsArr[0]] !== undefined || ValidCmds.nsfw[argsArr[0]] !== undefined) return true
  else return Strings.Errors.InvalidImageFunctionName
}

const validateNSFWFlag = (val, msg, args) => {
  if (val.toLowerCase().startsWith('n')) return true
  else return Strings.Errors.InvalidNSFWFlag
}

/**
 * Gets the image/gif URL of the request image from nekos.life.
 *
 * @param {string} imageName The name of the image function to call.
 * @param {string} nsfwFlag The nsfwFlag string.
 */
const getNekoImg = async (imageName, nsfwFlag) => {
  const imgName = imageName.trim().toLowerCase()

  const nsfwVer = ValidCmds.nsfw[imgName]
  const sfwVer = ValidCmds.sfw[imgName]

  // See if there is a NSFW & SFW version of the same imageName.
  if (nsfwVer && sfwVer) {
    // One found in both. Verify user provided a NSFW flag.
    if (nsfwFlag && nsfwFlag.trim().toLowerCase().startsWith('n')) {
      // Flag provided, use NSFW version.
      var funcName = nsfwVer
      nsfwFlag = true
    } else {
      // Flag not provided, use SFW version.
      funcName = sfwVer
      nsfwFlag = false
    }
  } else if (sfwVer) {
    // Only a SFW version exists.
    funcName = sfwVer
    nsfwFlag = false
  } else if (nsfwVer) {
    // Only a NSFW version exists.
    funcName = nsfwVer
    nsfwFlag = true
  } else {
    // Neither a SFW or NSFW version exist with this name.
    console.error(`${imageName} does not have a SFW or NSFW version. Please provide a real value.`)
    return undefined
  }

  try {
    if (nsfwFlag) var img = await nekos.nsfw[funcName]()
    else img = await nekos.sfw[funcName]()

    const retObj = {
      nsfw: nsfwFlag,
      url: img.url
    }

    return retObj
  } catch (err) { return err }
}

module.exports.validateFuncName = validateFuncName
module.exports.validateNSFWFlag = validateNSFWFlag
module.exports.getNekoImg = getNekoImg
