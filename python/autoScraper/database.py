from pymongo import MongoClient

class Database:
    def __init__(self):
        client = MongoClient('mongodb://heroku_r8wtvrh7:pp030v603cv137akko853r4ijp@ds119014.mlab.com:19014/heroku_r8wtvrh7')
        self.db = client.heroku_r8wtvrh7

    def insert_one(self, data, collection):
        collection = self.db[collection]
        collection.insert_one(data)
        print("Inserted")

    def insert_many(self, data, collection):
        collection = self.db[collection]
        collection.insert_many(data)
        print("Inserted")

    def find_in_movies(self, collection):
        col = self.db[collection]
        movies = self.db['allmovies']

        documents = col.find({})

        data = []
        fmovies = []
        for document in documents:
            fmovies.append(document)


        for movie in fmovies:
            m = movies.find_one({"name": movie['name']})
            if m != None:
                data.append(m)

        return data

    def find_in_banner(self):
        banners = self.db['banners']

        data = banners.find({})
        return data

    def test(self):
        movies = self.db['allmovies']

        m = movies.find_one({"name": "Tubelight"})
        print(m == None)

#if __name__ == '__main__':
    #db = Database()
    #print(len(db.find_in_movies('fmovies')))
