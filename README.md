![flux](./flux-logo-color.svg)

# Реализация поиска по файлам с архитектурой Flux
*Запуск проекта:*
1. *Node v14.11.0*
2. *Yarn v1.22.0 & npm v6.14.8*
3. *yarn или npm i*

## Классы
1. Store
    * Методы подписки и отписки от изменения данных
    * Метод обновления данных
    * Оповещение всех подписчиков об изменении данных
    
2. View
    * Методы генерации разметки
    * Отслеживание изменений в Store
    * Метод формирования и отправки action в store
    
## Reducer
* Чистая функция возвращающая state с необходимыми изменениями
* Типы action вынесены в перечисления Enum

### Используемые библиотеки
1. lodash - для копирования стейта 
2. parcel - для сборки проекта
3. typescript - для типизации
