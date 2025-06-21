using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace mylibaCaseApi.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        [Required(ErrorMessage = "İsim alanı zorunludur.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "İsim 2-50 karakter arasında olmalıdır.")]
        public string Name { get; set; } = null!;

        [BsonElement("surname")]
        [Required(ErrorMessage = "Soyisim alanı zorunludur.")]
        [StringLength(50, ErrorMessage = "Soyisim en fazla 50 karakter olabilir.")]
        public string Surname { get; set; } = null!;

        [BsonElement("email")]
        [Required(ErrorMessage = "Email alanı zorunludur.")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz.")]        
        public string Email { get; set; } = null!;
    }
}
