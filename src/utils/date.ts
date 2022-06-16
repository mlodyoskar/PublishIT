import dayjs from 'dayjs';

const dateFormat = 'DD.MM.YYYY HH:mm';

const formatDate = (date: Date) => {
  return dayjs(date).format(dateFormat);
};

export { formatDate };
