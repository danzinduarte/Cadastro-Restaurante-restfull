using System.Collections.Generic;
using Api.Models;

namespace Api.repository
{
    public interface IPratosRepository
    { 
         void Add(Pratos prato);
         IEnumerable<Pratos> GetAll();
         Pratos Find(int id);
         void Remove(int id);
         void Update(Pratos prato);
    }
}