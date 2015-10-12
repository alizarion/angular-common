FROM centos:7
MAINTAINER Selim <selim@openlinux.fr>

ENV container docker

RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
EXPOSE 80
CMD ["/usr/sbin/init"]
