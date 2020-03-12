using System;
using System.Collections.Generic;
using System.Linq;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.repository
{
    public class PratosRepository : IPratosRepository
    {
        private readonly DataDbContext _contexto;
        public PratosRepository (DataDbContext ctx)
        {   
            _contexto = ctx;
        }
        public void Add(Pratos prato)
        {
             using (var transaction = _contexto.Database.BeginTransaction())
            {
                try
                {
                    _contexto.pratos.Add(prato);
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

        public Pratos Find(int id)
        {
           return _contexto.pratos.FirstOrDefault (u => u.Id == id);
        }

        public IEnumerable<Pratos> GetAll()
        {
            return _contexto.pratos
            .AsNoTracking()
            .ToList();
        }

        public void Remove(int id)
        {
              using (var transaction = _contexto.Database.BeginTransaction())
            {
                try 
                {
                    var entity = _contexto.pratos.First(u => u.Id == id);
                    _contexto.pratos.Remove(entity);
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

        public void Update(Pratos prato)
        {
             using (var transaction = _contexto.Database.BeginTransaction())
            {
                try
                {
                    _contexto.pratos.Update(prato);
                    _contexto.SaveChanges();
                    transaction.Commit();
                }
               
                catch (Exception e) 
                {
                    Console.WriteLine("Erro");
                    Console.WriteLine(e);
                    transaction.Rollback();
                    throw new System.Net.WebException (string.Format("Falha ao atualizar dados do Pratos"));
                }
            }
        }
    }
}