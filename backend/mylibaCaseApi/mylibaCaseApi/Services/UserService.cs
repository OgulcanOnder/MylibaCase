using Microsoft.Extensions.Options;
using MongoDB.Driver;
using mylibaCaseApi.Entities;
using mylibaCaseApi.Helpers;

namespace mylibaCaseApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;
        public UserService(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _users = database.GetCollection<User>(settings.Value.CollectionName);
        }
        // Bütün Kullanıcıları Getirir
        public List<User> Get() => _users.Find(u => true).ToList();

        public User Get(string id) => _users.Find(u => u.Id == id).FirstOrDefault();

        // Kullanıcı Oluşturur
        public User Create(User user)
        {
            // Email Unique'mi Kontrolü Sağlar
            var existingUser = _users.Find(u => u.Email.ToLower() == user.Email.ToLower()).FirstOrDefault();
            if(existingUser!=null)
            {
                throw new ApplicationException("Bu Email Adresi Zaten Kullanılıyor!");
            }
            _users.InsertOne(user);
            return user;
        }
        // Kullanıcıları Günceller
        public void Update(string id, User updateUser) 
        {
            updateUser.Id = id;
            var existingUser = _users.Find(u => u.Email.ToLower() == updateUser.Email.ToLower()
             && u.Id!=id).FirstOrDefault();
            if (existingUser!=null)
            {
                throw new ApplicationException("Bu Email Adresi Zaten Kullanılıyor!");
            }
            else
            {
                _users.ReplaceOne(p => p.Id == id, updateUser);
            }
        }                       
        

        // Kullanıcı Siler
        public void Remove(string id) =>
            _users.DeleteOne(u => u.Id == id);
        
    }
}
