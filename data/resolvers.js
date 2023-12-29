
import { Widgets } from "./dbConnectors";


export const resolvers = {
    getProduct: ({id}) => {
        return Widgets.findById({_id: id}).then(product => {
            return product;
        }).catch(err => {
            console.log("Error from getProduct: ", err)
        });
       
    },
    getAllProducts: () => {
        return Widgets.find({});
    },
    createProduct: ({input}) => {
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores
        });

        newWidget.id = newWidget._id;
        return newWidget.save().then( () => {
            return newWidget;
        }).catch(err => {
            console.log("Error from save: ", err)
        });
    },
    updateProduct: async({input}) => {
        try{
            return await Widgets.findByIdAndUpdate({_id: input.id}, input, {new: true});
        } catch (err) {
            console.log(err);
        }
    },
    deleteProduct: async({id}) => {
        try{
            await Widgets.deleteOne({id: id});
            return "Succesfully deleted widget!";
        } catch (err) {
            console.log(err);
        }
    }
};

export default resolvers;