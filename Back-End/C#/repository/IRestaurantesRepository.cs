using System.Collections.Generic;
using Api.Models;

namespace Api.repository
{
    public interface IRestaurantesRepository
    {
         void Add(Restaurantes restaurante);
         IEnumerable<Restaurantes> GetAll();
         Restaurantes Find(int id);
         void Remove(int id);
         void Update(Restaurantes restaurante);
    }
}