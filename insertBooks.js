const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<admin>:<passwd>@cluster0.fu7bv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected");

        const database = client.db("BookStore");
        const collection = database.collection("Books");

        const books = [
            { title: "Capitalism in America", author: "Alan Greenspan", publisher: "Penguin Press", date: "08-16-2018", website: "https://en.wikipedia.org/wiki/Capitalism_in_America" },
            { title: "War by Other Means", author: "Jennifer M. Harris", publisher: "Harvard University Press", date: "04-11-2016", website: "https://www.goodreads.com/book/show/27311801-war-by-other-means" },
            { title: "Chip War", author: "Chris Miller", publisher: "Scribner", date: "10-04-2022", website: "https://www.goodreads.com/book/show/60321447-chip-war?ref=rae_0" },
            { title: "Cobalt Red", author: "Siddharth Kara", publisher: "St. Martin's Press", date: "01-31-2023", website: "https://www.goodreads.com/book/show/60784614-cobalt-red?ref=rae_12" },
            { title: "Recoding America", author: "Jennifer Pahlka", publisher: "Metropolitan Books", date: "06-13-2023", website: "https://www.goodreads.com/book/show/61796680-recoding-america" }
        ];

        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} books inserted`);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
