/**
 * @overview Entry file for operation paste
 * @module tara-file-operations/paste
 */
import * as electron from "electron";
import * as DB from "nedb";
import { join } from "path";
import Tara from "../../../../renderer/boot/plugin-client";
import { TARA_CONFIG_DBS } from "../../../../renderer/constants";
import Logger from "../../../../renderer/logger";
import pkgJSON from "../../package.json";
import { FILE_OPT_OPEN_WINDOW } from "../constants";

module.exports = () => {
  const logger = new Logger({
    name: "paste",
  });
  const tara = new Tara(pkgJSON, electron, logger);
  // Store dest
  const db = new DB({ filename: join(TARA_CONFIG_DBS, "file-operations", "tmp.db"), autoload: true });
  db.update({}, { $set: { dest: process.cwd() } }, {}, (err, docs) => {
    if (err) {
      throw err;
    } else {
      // Load window
      electron.ipcRenderer.send(FILE_OPT_OPEN_WINDOW, {});
    }
  });
};
