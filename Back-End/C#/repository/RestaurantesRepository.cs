using System;
using System.Collections.Generic;
using System.Linq;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.repository
{
    public class RestaurantesRepository : IRestaurantesRepository
    {
        private readonly DataDbContext _contexto;
        public RestaurantesRepository (DataDbContext ctx)
        {   
            _contexto = ctx;
        }
        public void Add(Restaurantes restaurante)
        {
             using (var transaction = _contexto.Database.BeginTransaction())
            {
                try
                {
                    _contexto.restaurantes.Add(restaurante);
                    _contexto.SaveChanges();
                    transaction.Commit();
                }
                 catch (Exception e) 
                {
                    Console.WriteLine("Erro");
                    Console.WriteLine(e);
                    transaction.Rollback();
                }
            }
        }

        public Restaurantes Find(int id)
        {
           return _contexto.restaurantes.FirstOrDefault (u => u.Id == id);
        }

        public IEnumerable<Restaurantes> GetAll()
        {
            return _contexto.restaurantes
            .AsNoTracking()
            .ToList();
        }

        public void Remove(int id)
        {
              using (var transaction = _contexto.Database.BeginTransaction())
            {
                try 
                {
                    var entity = _contexto.restaurantes.First(u => u.Id == id);
                    _contexto.restaurantes.Remove(entity);
                    _contexto.SaveChanges();
                    transaction.Commit();
                }
                 catch (Exception e) 
                {
                    Console.WriteLine("Erro");
                    Console.WriteLine(e);
                    transaction.Rollback();
                    return;
                }
            }
        }

        public void Update(Restaurantes restaurante)
        {
             using (var transaction = _contexto.Database.BeginTransaction())
            {
                try
                {
                    _contexto.restaurantes.Update(restaurante);
                    _contexto.SaveChanges();
                    transaction.Commit();
                }
               
                catch (Exception e) 
                {
                    Console.WriteLine("Erro");
                    Console.WriteLine(e);
                    transaction.Rollback();
                    throw new System.Net.WebException (string.Format("Falha ao atualizar dados do Restaurante"));
                }
            }
        }
    }
}