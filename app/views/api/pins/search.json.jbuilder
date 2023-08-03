json.pins({})

json.pins do 
    @pins.each do |pin|
        json.set! pin.id do
            json.extract! pin, :id, :title, :description
        end
    end
end