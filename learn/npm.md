# NPM
## Установка
NPM устанавливается вместе с [NodeJS](nodejs.org).

При установке глобальных пакетов на свежеустановленный NPM (например, `npm install -g webpack`) могут вылетать EACCES-ошибки. Это связано с недостаточнм уровнем доступа вашего пользователя к `/usr/local`, куда NPM ставит глобальные пакеты.

Права доступа настраиваются парой команд из [официального руководства](https://docs.npmjs.com/getting-started/fixing-npm-permissions). В 99% случаев вам нужен раздел [Option 1](https://docs.npmjs.com/getting-started/fixing-npm-permissions#option-1-change-the-permission-to-npms-default-directory).

:exclamation: Не нужно устанавливать глоабльные пакеты под `sudo`.

## Чистка
Если вдруг пропадет куда-то место на вашем SSD-диске, можно pапустить `npm cache clean` и удалить закешированные пакеты. Каждый новый пакет кешируется для последующей быстрой установки. Их может накопиться очень много.


