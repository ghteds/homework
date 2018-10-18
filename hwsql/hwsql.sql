#use sakila
show tables

select count(*) from information_schema.tables where table_schema='sakila'

select * from information_schema.columns where table_name='actor'

#1a
select first_name, last_name from sakila.actor
#1b
select upper(concat(first_name,' ', last_name)) as 'Actor Name' from sakila.actor
#2a
select * from sakila.actor where first_name='joe'
#2b
select * from sakila.actor where last_name like '%gen%'
#2c
select * from sakila.actor where last_name like '%li%' order by last_name, first_name
#2d 
select country_id, country from country where country in ('Afghanistan','Bangladesh','China')
#3a
#select * from actor
alter table actor
add description blob
#3b
alter table actor
drop description
#4a
select last_name, count(*) as c from actor group by last_name order by c desc
#4b
SELECT 
    last_name, COUNT(*) AS c
FROM
    actor
GROUP BY last_name
HAVING c > 2
ORDER BY c DESC
#4c
#select * from actor where last_name = 'williams'
#select * from actor where first_name = 'groucho' and last_name ='williams'
update actor set first_name = 'HARPO' where first_name = 'groucho' and last_name ='williams'
#4D
#select * from actor where first_name='harpo'
update actor set first_name ='GROUCHO' where actor_id = 172
#select * from actor where actor_id =172
#5a
#select * from address
show create table address
#6a
#select * from staff
select 
	first_name,
    last_name,
    address
from staff s
	inner join address a
    on s.address_id = a.address_id
#6b
#select * from payment
select
	first_name,
    last_name,
    #rental_id,
    sum(amount) as Total
    #payment_date
from
	staff s
    inner join payment p
    on s.staff_id = p.staff_id
group by first_name, last_name

#6c
#film and actors per film; film_actor and film
#select * from film_actor
#select * from film
select 
	title,
    description,
    release_year,
    #first_name,
    #last_name,
    count(*) as 'Number of Actors'
from
	film_actor fa
join actor a 
	on fa.actor_id = a.actor_id
join film f
	on fa.film_id = f.film_id
group by title

#6d
#select * from film where title ='Hunchback Impossible'
select
	title,
    count(inventory_id) as 'Inventory'
from 
	film f
join inventory i 
	on f.film_id = i.film_id
where title = 'Hunchback Impossible'
group by title
#6e
#select * from payment
#select * from customer

select
	last_name,
    ',',
    first_name,
    
    sum(amount)
from 
	customer c
join payment p
	on c.customer_id = p.customer_id
group by last_name, first_name
order by last_name, first_name

#7a

select
	title
from film 
where 
	(title like 'K%' or title like 'Q%')
and language_id in (select language_id from language where name ='english')

#7b
#actors in alone trip with subqueries
select * from actor
select * from film_actor
select 
	first_name,
    last_name
from actor a
where 
	actor_id in (select actor_id from film_actor where film_id in 
					(select film_id from film where title = 'Alone Trip'))
                    
                    
#7c
#canada, names, email, 
/*
select * from customer
select * from address
select * from country
show databases
select * from information_schema.columns where column_name='country_id'
select * from city
*/
select
	first_name,
    last_name,
    email
from 
	customer c
join 
	address a 
    on c.address_id = a.address_id
join 
	city ci
    on ci.city_id = a.city_id
join country cou
	on cou.country_id =ci.country_id
where
	country ='Canada'

#7d
#family films
/*
select * from film
select * from film_category
select * from category
*/
select 
	title 'Family Movies',
    description
    
from film f

join film_category fc
	on f.film_id = fc.film_id
join category c 
	on c.category_id = fc.category_id
where c.name ='Family'	

#7e 
#most frequently rented movies desc
/*
select * from rental
select * from inventory
select * from film
*/

select 
	title,
    count(rental_id) as 'Rentals'
from
	film f
join inventory i
	on i.film_id = f.film_id
join rental r
	on r.inventory_id = i.inventory_id
    
group by title
order by Rentals desc

#7f
# business by store
/*
select * from payment staff_id and amount
select * from staff store_id
select * from store only 2 stores? 
select 
*
from store s
join address a
	on a.address_id = s.address_id
*/
select
	st.store_id,
	sum(amount) as 'Sales'
from 
	payment p
join staff s
	on p.staff_id = s.staff_id
join store st
	on st.store_id = s.store_id
    
group by store_id

#7g
#store ID, city, and country.
select * from store storeid, address_id
select * from address address_id, city_id
select * from city


select
	s.store_id,
    ci.city,
    cou.Country
from 
	store s
join
	address a
    on a.address_id=s.address_id 
join 
	city ci
    on ci.city_id = a.city_id
join country cou
	on cou.country_id =ci.country_id;
    
#7h. 
/*top five genres in gross revenue in descending order.
 (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
 cat, ,payment
select * from category; cat and catid
select * from film_category; catid, film_id
select * from inventory; invid,filmid, storeid
select * from rental; invid, custid,rentid,staffid
select * from payment pay_id, custid, staffid, rentalid, amount
select * from information_schema.columns where column_name='film_id'
*/
select
	cat.name,
	sum(p.amount) as 'Sales'
from 
	category cat
join film_category fc
	on fc.category_id = cat.category_id
join inventory i
	on i.film_id = fc.film_id
join rental r
	on r.inventory_id = i.inventory_id
join payment p
	on p.rental_id = r.rental_id
group by cat.name
order by Sales desc
limit 5
;

#8a
create view topFiveGenresByRevenue as
select
	cat.name 'Category',
	sum(p.amount) as 'Sales'
from 
	category cat
join film_category fc
	on fc.category_id = cat.category_id
join inventory i
	on i.film_id = fc.film_id
join rental r
	on r.inventory_id = i.inventory_id
join payment p
	on p.rental_id = r.rental_id
group by cat.name
order by Sales desc
limit 5
;	

#8b
select * from topfivegenresbyrevenue;
#8c
drop view topfivegenresbyrevenue;