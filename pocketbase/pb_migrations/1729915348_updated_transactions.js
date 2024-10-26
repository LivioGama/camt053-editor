/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("17u298xmpi054gc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "el7wl6au",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "debit",
        "credit"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("17u298xmpi054gc")

  // remove
  collection.schema.removeField("el7wl6au")

  return dao.saveCollection(collection)
})
