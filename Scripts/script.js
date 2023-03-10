async function loadProducts(numProducts) {
    try{
        let url = `https://fakerapi.it/api/v1/products?_quantity=${numProducts}&_taxes=12&_categories_type=string`;
        let response = await fetch(url);
        if (response.ok) {
            let responseData = await response.json();
            return responseData;
        }
        else{
            alert("Error llamando a la API");
        }
    }
    catch (e) {
        console.log(e);
    }
   
}

function getCategoryList(rawApiResponseData){
    // Creamos un objeto para poder tener la categoria como nombre y la relacion de la cantidad de productos que tiene esda categoria
    let categoriesWithNumberOfProductsInCategory = {};
    // Para el array que me da la api de productos. Del tipo [product1,prodct2,...] Itero para acceder a alas proiedades de productn
    rawApiResponseData.forEach(productInfo => {
        //Aqui estaria dentro de 1 producto, ej: product1. Que sabemos que tiene una lista de categorias
        // para poder coger cada una de las categorias, tiero sobreproductInfo.categories
        productInfo.categories.forEach(categoryName=> {
            // Comprobamos si una categoria. EJ: CategoriaX; Esta dentro del objeto categoriesWithNumberOfProductsInCategory.
            // PAra eso usamos Object.keys(objeto) que nos da un resultado de todas las categorias que existen dentro de ese objeto.
            // si no existe, agregamos una nueva con el valor 1 puesto que la hemos encontrado por primera vez
            /*
            -- Object.keys(categoriesWithNumberOfProductsInCategory) 
                Lista de categorias de los productos
            */
           
            if (! Object.keys(categoriesWithNumberOfProductsInCategory).includes(categoryName)) {
                //definimos un array para poder guardar los objetos enteros
                categoriesWithNumberOfProductsInCategory[categoryName] = [];
                categoriesWithNumberOfProductsInCategory[categoryName].push(productInfo);
            }else{
                // SI la encontramos, es decir, si la categoria existe dentro del objeto, agregamos 1 unidad mas, porque hemos encontramos otro objeto mas
                //Hacemos push a la lista de productos de la categoria
                categoriesWithNumberOfProductsInCategory[categoryName].push(productInfo);
            }
        });
    });
    console.log(categoriesWithNumberOfProductsInCategory);
    return categoriesWithNumberOfProductsInCategory;
}