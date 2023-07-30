class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.integer :user_id, null:false, index:true
      t.string :title, null:false
      t.timestamps
    end

    add_foreign_key :boards, :users, column: :user_id
  end
end
