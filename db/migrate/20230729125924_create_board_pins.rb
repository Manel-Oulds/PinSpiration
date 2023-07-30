class CreateBoardPins < ActiveRecord::Migration[7.0]
  def change
    create_table :board_pins do |t|
      t.integer :board_id, null:false, index:true
      t.integer :pin_id, null:false, index:true
      t.timestamps
    end
    add_foreign_key :board_pins, :pins, column: :pin_id
    add_foreign_key :board_pins, :boards, column: :board_id
  end
end
