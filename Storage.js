/**
 * ...
 */
class Storage {
  /**
   * Constructs object of current class
   * @param {string} data_name
   */
  constructor(data_name) {
    this.base_url =
      "https://bezkomisijas.lv/api-storage/797b8f1b59b64b66cb21981b9370b8b4/";
    this.data_name = data_name;
    let data = {
      last_id: 0,
      entries: {},
    };
    const json_content = localStorage.getItem(data_name);

    if (json_content != null) {
      data = JSON.parse(json_content);
    }

    this.data = data;
  }
  getAll(callback) {
    fetch(this.base_url + "/" + this.data_name + "/?action=get-all")
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== true) return;
        callback(result.entries);
      });
  }
  set(id, value, callback) {
    const obj = this;
    const data = new FormData();
    data.append("index", id);
    data.append("symbol", value);

    fetch(this.base_url + "/" + this.data_name + "/?action=create", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== true) return;

        obj.data.entries[result.entry.id];
        callback(result.entry.id, result.entry);
      });
  }

  clear() {
    fetch(this.base_url + "/" + this.data_name + "/?action=clear")
      .then((response) => response.json())
      .then((result) => {
        // if (result.status !== true) return;
        // callback(result.entries);
      });
  }

  getEntry(id) {
    return this.data.entries[id];
  }
}
