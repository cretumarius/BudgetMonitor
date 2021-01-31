using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DataAccess.Base.Context;
using Domain.Base;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository
{
    public abstract class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected BaseRepository(IDataContext dataContext)
        {
            CurrentDataContext = dataContext;
        }

        protected IDataContext CurrentDataContext { get; }

        public TEntity GetById(object key)
        {
            return CurrentDataContext.Set<TEntity>().Find(key);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return CurrentDataContext.Set<TEntity>().ToList();
        }

        public IEnumerable<TEntity> GetCollectionByFilterWihtChildren(Expression<Func<TEntity, bool>> filter, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = CurrentDataContext.Set<TEntity>().Where(filter);

            if (includeProperties != null && includeProperties.Any())
            {
                query = includeProperties.Aggregate(query, (current, include) => current.Include(include));
            }

            return query;
        }

        public TEntity GetByFilterWithChildren(Expression<Func<TEntity, bool>> filter, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = CurrentDataContext.Set<TEntity>().Where(filter);
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.FirstOrDefault();

        }

        public TEntity Add(TEntity entity)
        {
            var addedEntity = CurrentDataContext.Set<TEntity>().Add(entity);

            return addedEntity.Entity;
        }

        public void Delete(object id)
        {
            var entity = CurrentDataContext.Set<TEntity>().Find(id);
            CurrentDataContext.Set<TEntity>().Remove(entity);
        }
    }
}
