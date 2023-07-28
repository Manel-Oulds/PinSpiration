class CreatePins < ActiveRecord::Migration[7.0]
  def change
    create_table :pins do |t|
      t.integer :user_id, null:false, index:true
      t.string :title, null:false
      t.text :description
      t.timestamps
    end
    add_foreign_key :pins, :users, column: :user_id
  end
end
