import { version } from '../package.json';
import { toM3u8 } from './toM3u8';
import { toPlaylists } from './toPlaylists';
import { inheritAttributes } from './inheritAttributes';
import { stringToMpdXml } from './stringToMpdXml';
import { parseUTCTimingScheme } from './parseUTCTimingScheme';
import {addSegmentsToPlaylist} from './segment/segmentBase.js';

const VERSION = version;

const parse = (manifestString, options = {}) => {
  const parsedManifestInfo = inheritAttributes(stringToMpdXml(manifestString), options);
  const playlists = toPlaylists(parsedManifestInfo.representationInfo);

  return toM3u8(playlists,parsedManifestInfo.baseUrls, parsedManifestInfo.locations, options.sidxMapping);
};

/**
 * Additional Function
 * @param {string} b64String 
 * @param {Object|null} options 
 */
const b64Parse = (b64String, options) => {
  return parse(Buffer.from(b64String, 'base64').toString('ascii'), options)
}

/**
 * Parses the manifest for a UTCTiming node, returning the nodes attributes if found
 *
 * @param {string} manifestString
 *        XML string of the MPD manifest
 * @return {Object|null}
 *         Attributes of UTCTiming node specified in the manifest. Null if none found
 */
const parseUTCTiming = (manifestString) =>
  parseUTCTimingScheme(stringToMpdXml(manifestString));

const addSidxSegmentsToPlaylist = addSegmentsToPlaylist;

export {
  VERSION,
  parse,
  b64Parse,
  parseUTCTiming,
  stringToMpdXml,
  inheritAttributes,
  toPlaylists,
  toM3u8,
  addSidxSegmentsToPlaylist
};
